import defaultSettings from '@/settings'

const title = defaultSettings.title || 'MaaS Integration Hub'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
