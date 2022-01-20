import { h, resolveComponent } from 'vue'
import { DesktopPulse24Regular as DesktopIcon, CalendarAgenda24Regular as  CalendarIcon, PeopleCommunity24Regular as CommunityIcon} from "@vicons/fluent";
import { NIcon } from 'naive-ui'

export function createMenu() {

  const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  return [
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'symptom',
            }
          },
          {
            default: () => '寻医问诊'
          }
        ),
      key:'symptom',
      icon: renderIcon(CalendarIcon)
    },
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'questionnaire',
            }
          },
          {
            default: () => '心理测试'
          }
        ),
      key:'questionnaire',
      icon: renderIcon(DesktopIcon)
    },
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'community',
            }
          },
          {
            default: () => '社区交流'
          }
        ),
      key:'community',
      icon: renderIcon(CommunityIcon)
    }
  ]
}