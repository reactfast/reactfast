export function deletePage(id) {
  async function getDef() {
    const { error } = await supabase.from('pages').delete().eq('id', id)
  }
  getDef()
}

export function updatePageOrder(order, id) {
  async function getDef() {
    const { error } = await supabase.from('pages').delete().eq('id', id)
  }
  getDef()
}

export function createPage(name, author) {
  async function getDef() {
    const { error } = await supabase.from('pages').delete().eq('id', id)
  }
  getDef()
}
