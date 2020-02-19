export interface Widget {
  _id: string
  name: string
  author: string
  images: string[]
  filename: string[]
  active: boolean
  description: string
}

export interface WidgetsResponse {
  success: boolean
  widgets: [Widget]
}

export interface WidgetResponse {
  success: boolean
  widget: Widget
}
