'use client'

import clsx from 'clsx'
import { Button } from '@/components/Button'

const code = `import { useState } from "react";
import { FastForm, createFormHandler } from "@reactfast/forms";

const fields = [
  { name: "firstName", title: "First Name", type: "string", width: 50 },
  { name: "lastName", title: "Last Name", type: "string", width: 50 },
  { name: "email", title: "Email", type: "email", width: 100 },
  { name: "subscribe", title: "Subscribe?", type: "boolean", width: 100 },
];

export default function App() {
  const [formData, setFormData] = useState({});

  const handleChange = createFormHandler({
    fields,
    setState: setFormData,
  });

  return (
    <FastForm
      fields={fields}
      onChange={handleChange}
      formData={formData}
    />
  );
}`

const tabs = [
  { name: 'App.jsx', isActive: true },
  { name: 'package.json', isActive: false },
]

export default function Hero() {
  return (
    <div className="bg-slate-900 dark:pb-20 dark:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          {/* Left Column: Title and buttons */}
          <div className="flex flex-col justify-center md:text-center lg:text-left">
            <h1 className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-400 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent">
              Build forms that just work.
            </h1>
            <p className="mt-4 text-2xl text-slate-300">
              Dynamic React forms powered by JSON schemas, modifiers, and
              subforms. Create complex, adaptive form systems without
              boilerplate.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button href="/docs/quickstart">Get started</Button>
              <Button
                href="https://github.com/reactfast/forms"
                variant="secondary"
              >
                View on GitHub
              </Button>
            </div>
          </div>

          {/* Right Column: Code */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-2xl bg-[#0A101F]/90 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              {/* Tabs */}
              <div className="mb-4 flex space-x-2 text-xs">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    className={clsx(
                      'flex h-6 items-center rounded-full px-2.5',
                      tab.isActive
                        ? 'bg-sky-500/20 font-medium text-sky-300'
                        : 'text-slate-500',
                    )}
                  >
                    {tab.name}
                  </div>
                ))}
              </div>

              {/* Code with line numbers */}
              <div className="flex overflow-x-auto font-mono text-sm">
                {/* Line numbers */}
                <div className="select-none border-r border-slate-600 pr-4 text-right text-slate-500">
                  {code.split('\n').map((_, i) => (
                    <div key={i}>{(i + 1).toString().padStart(2, '0')}</div>
                  ))}
                </div>

                {/* Code */}
                <pre className="whitespace-pre pl-4 text-slate-200">{code}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
