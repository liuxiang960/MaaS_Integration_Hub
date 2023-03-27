/*
 * @Author: liuxiang liuxiang@163.com
 * @Date: 2023-03-24 16:18:33
 * @LastEditors: liuxiang liuxiang@163.com
 * @LastEditTime: 2023-03-24 16:18:41
 * @FilePath: /MaaS_Integration_Hub/src/utils/i18n.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 翻译router.meta。标题，用于面包屑侧边栏tagsview
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
