'use client'

import { supabaseClient as supabase } from '@/config/supabase-client'
import { useEffect, useState } from 'react'
import { getUser } from '@/hooks/Auth'
import DoughnutChart from '@/components/charts/chartDoughnut'
import LineChart from '@/components/charts/chartLine'
import Loading from '../loading'
import { getUserSubscription } from '@/helpers/subs'
import AccountPageHeader from '@/components/accountPageHeader'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null) // logged in user
  const [qrCodes, setQrCodes] = useState([]) // qr codes
  const [pages, setPages] = useState([])
  const [visits, setVisits] = useState([])
  const [scanStats, setScanStats] = useState([])

  const [subscription, setSubscription] = useState(null) // user subscription
  const [selectedQrCode, setSelectedQrCode] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('this_month')

  const [stats, setStats] = useState({
    qrCodes: { name: 'Total QR Codes', stat: '0', change: '0%' },
    perDay: { name: 'Avg Per Day', stat: '0', change: '0%' },
    clickRate: { name: 'Avg. Click Rate', stat: '0%' },
    visits: { name: 'Total Visits', stat: '0' },
  })
  const [chartData, setChartData] = useState({})
  const [lineChartData, setLineChartData] = useState({})

  const [visitsChartData, setVisitsChartData] = useState({})
  const [visitsLineChartData, setVisitsLineChartData] = useState({})

  useEffect(() => {
    if (pages.length === 0 || visits.length === 0) return

    // Doughnut chart for visits per page
    const pagesWithVisits = pages
      .map((page) => {
        const pageVisits = visits.filter((v) => v.page === page.id)
        return { ...page, visitCount: pageVisits.length }
      })
      .filter((page) => page.visitCount > 0)

    const pageLabels = pagesWithVisits.map((p) => p.name || `Page ${p.id}`)
    const pageData = pagesWithVisits.map((p) => p.visitCount)

    setVisitsChartData({
      labels: pageLabels,
      datasets: [
        {
          data: pageData,
          backgroundColor: ['#f6c23e', '#1cc88a', '#36b9cc'],
          hoverBackgroundColor: ['#f4b619', '#17a673', '#2c9faf'],
        },
      ],
    })

    // Line chart for visits per day
    const getLast30Days = () => {
      const dates = []
      const today = new Date()

      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        dates.push({ date: formattedDate, count: 0 })
      }

      return dates
    }

    const mapVisitsToDays = () => {
      const last30Days = getLast30Days()
      const today = new Date()

      visits.forEach((visit) => {
        const visitDate = new Date(visit.created_at)
        const diffInTime = today - visitDate
        const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24))

        if (diffInDays >= 0 && diffInDays < 30) {
          const index = 29 - diffInDays
          last30Days[index].count++
        }
      })

      return last30Days
    }

    const dailyVisitData = mapVisitsToDays()

    setVisitsLineChartData({
      labels: dailyVisitData.map((day) => day.date),
      datasets: [
        {
          label: 'Visits per Day',
          data: dailyVisitData.map((day) => day.count),
          fill: true,
          borderColor: '#1cc88a',
          backgroundColor: 'rgba(28, 200, 138, 0.5)',
          tension: 0.1,
        },
      ],
    })
  }, [pages, visits])

  // Fetch user data
  useEffect(() => {
    async function _getUser() {
      const user = await getUser()
      setUserData(user)
      setLoading(false)
    }
    _getUser()
  }, [])

  useEffect(() => {
    if (!userData) return

    async function getSubscription() {
      if (userData) {
        const sub = await getUserSubscription(userData.id)
        setSubscription(sub.designation == 'free' ? null : sub)
      }

      setLoading(false)
    }
    getSubscription()
  }, [userData])

  // get page data
  useEffect(() => {
    if (!userData) return

    async function _getPages() {
      let { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', userData.id)

      if (error) {
        console.error('Error fetching data:', error)
        alert('An error occurred while fetching the pages. Please try again.')
        return
      }

      setPages(data)
      setLoading(false)
    }

    _getPages()
  }, [userData])

  // get visits
  useEffect(() => {
    if (pages.length === 0) return

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const pageIds = pages.map((page) => page.id)

    async function _getVisits() {
      let { data, error } = await supabase
        .from('visits')
        .select('*')
        .in('page', pageIds)
        .gte('created_at', thirtyDaysAgo.toISOString())

      if (error) {
        console.error('Error fetching data:', error)
        return
      }

      setVisits(data)
      setLoading(false)
    }

    _getVisits()
  }, [pages])

  //  GET QR CODES
  useEffect(() => {
    if (!userData) return

    async function _getQrs() {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      let query = supabase
        .from('qr_codes')
        .select(
          `
          id, 
          name, 
          qr_scans(*)
        `,
        )
        .eq('user_id', userData.id)
        .filter('qr_scans.created_at', 'gte', thirtyDaysAgo.toISOString())

      let { data, error } = await query

      if (error) {
        console.error('Error fetching data:', error)
        alert(
          'An error occurred while fetching the QR codes. Please try again.',
        )
        return
      }

      setQrCodes(data)
    }

    _getQrs()
  }, [userData])

  // GET SCANS
  useEffect(() => {
    if (qrCodes.length === 0 || !qrCodes) return

    async function _getScans() {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const qrIds = await qrCodes.map((qr) => qr.id)

      let { data, error } = await supabase
        .from('qr_scans')
        .select('*')
        .in('qr_id', qrIds)
        .gte('created_at', thirtyDaysAgo.toISOString())

      if (error) {
        console.error('Error fetching data:', error)
        alert(
          'An error occurred while fetching the QR codes. Please try again.',
        )
        return
      }

      setScanStats(data)
    }

    _getScans()
  }, [qrCodes])

  //  SETTING STATS
  useEffect(() => {
    if (qrCodes.length === 0 || !qrCodes) return
    console.log('Scan Stats', scanStats)
    const daysInMonth = new Date().getDate()
    const avgPerDay = (scanStats.length / daysInMonth).toFixed(2)

    // scanStats
    // qrCodes

    setStats({
      qrCodes: { name: 'Total QR Codes', stat: qrCodes.length.toString() },
      perDay: {
        name: 'Total Scans',
        stat: scanStats.length.toString(),
        change: 'N/A',
      },

      clickRate: {
        name: 'Avg Per Day',
        stat: avgPerDay.toString(),
        change: 'N/A',
      },
      visits: {
        name: 'Total Visits',
        stat: visits.length.toString(),
        change: 'N/A',
      },
    })

    //! thi is where we left off. the issue is that we have scans and qr seoperate now so we need labels of the qr codes with the scans idk

    // Filter QR codes to remove those without qr_scans
    const validQRCodes = qrCodes.filter(
      (qr) => Array.isArray(qr.qr_scans) && qr.qr_scans.length > 0,
    )

    const qrLabels = validQRCodes.map((qr) => qr.name || `QR Code ${qr.id}`)

    setChartData({
      labels: qrLabels,
      datasets: [
        {
          data: validQRCodes.map((qr) => qr.qr_scans.length),
          backgroundColor: ['#020DF9', '#E9722D', '#2ecc71'],
          hoverBackgroundColor: ['#2980b9', '#f39c12', '#27ae60'],
        },
      ],
    })

    const getLast30Days = () => {
      const dates = []
      const today = new Date()

      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(today.getDate() - i)
        const formattedDate = date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        dates.push({ date: formattedDate, count: 0 }) // Initialize count as 0
      }

      return dates
    }

    const mapScansToDays = (scanStats) => {
      const last30Days = getLast30Days()
      const today = new Date()

      scanStats?.forEach((scan) => {
        const scanDate = new Date(scan.created_at)
        const diffInTime = today - scanDate
        const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24))

        // Only consider scans from the last 30 days
        if (diffInDays >= 0 && diffInDays < 30) {
          const index = 29 - diffInDays // Reverse index to keep the latest date last
          last30Days[index].count++
        }
      })

      return last30Days
    }

    const dailyScanData = mapScansToDays(scanStats)

    setLineChartData({
      labels: dailyScanData.map((day) => day.date),
      datasets: [
        {
          label: 'Scans per Day',
          data: dailyScanData.map((day) => day.count),
          fill: true,
          borderColor: '#020DF9',
          backgroundColor: 'rgba(2, 13, 249, 0.8)',
          tension: 0.1,
        },
      ],
    })
  }, [qrCodes, visits, scanStats])

  if (loading) return <Loading />

  return (
    <>
      <AccountPageHeader
        kicker={'Analytics'}
        title="Analytics"
        description={
          'Get insights into your QR codes and pages. Track scans, visits, and more.'
        }
      />

      <div className="container mx-auto p-4 px-8">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Last 30 days
          </h3>
          <dl className="mb-10 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
            {Object.values(stats).map((item) => (
              <div
                key={item.name}
                className="overflow-hidden rounded-lg bg-white px-4 py-4 shadow sm:p-6"
              >
                <dt className="truncate text-sm font-medium text-gray-500">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                  {item.stat}
                </dd>
                {item.change && (
                  <dd
                    className={`mt-1 text-sm ${parseFloat(item.change) >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {parseFloat(item.change) >= 0 ? '▲' : '▼'} {item.change}{' '}
                    from previous period
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>

        <h2 className="w-full text-3xl text-primary">Scans</h2>
        <div className="grid grid-cols-12 gap-4">
          {/* Doughnut Chart */}
          <div className="relative col-span-4 rounded-lg bg-white p-4 shadow">
            <div className={`${!subscription ? 'blur-sm' : ''}`}>
              <DoughnutChart chartData={chartData} />
            </div>
            {!subscription && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
                <span className="text-sm font-semibold text-gray-600">
                  Subscribe to view chart
                </span>
              </div>
            )}
          </div>

          {/* Line Chart */}
          <div className="relative col-span-8 rounded-lg bg-white p-4 shadow">
            <div className={`${!subscription ? 'blur-sm' : ''}`}>
              <LineChart chartData={lineChartData} />
            </div>
            {!subscription && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
                <span className="text-sm font-semibold text-gray-600">
                  Subscribe to view chart
                </span>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-3xl text-primary">Visits</h2>
        <div className="grid grid-cols-12 gap-4">
          {/* Visits Doughnut Chart */}
          <div className="relative col-span-4 rounded-lg bg-white p-4 shadow">
            <div className={`${!subscription ? 'blur-sm' : ''}`}>
              <DoughnutChart chartData={visitsChartData} />
            </div>
            {!subscription && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
                <span className="text-sm font-semibold text-gray-600">
                  Subscribe to view chart
                </span>
              </div>
            )}
          </div>

          {/* Visits Line Chart */}
          <div className="relative col-span-8 rounded-lg bg-white p-4 shadow">
            <div className={`${!subscription ? 'blur-sm' : ''}`}>
              <LineChart chartData={visitsLineChartData} />
            </div>
            {!subscription && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
                <span className="text-sm font-semibold text-gray-600">
                  Subscribe to view chart
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
