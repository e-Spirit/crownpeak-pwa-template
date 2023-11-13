import { Image, DataEntry, RichTextElement, Section } from 'fsxa-api'
export enum ServerErrors {
  MISSING_LOCALE = 'Please specify a locale in the body through: e.g. "locale": "de_DE" ',
  UNKNOWN_ROUTE = 'Could not map given route and method.',
  UNKNOWN = 'Unkown error'
}

export type LegalLink = {
  name: string
  route: string
}

export interface AccordionItem {
  st_content: RichTextElement[]
  st_title: string
}

export interface Accordion {
  st_accordion: [
    {
      data: AccordionItem
      id: string
      previewId: string
    }
  ]
  st_headline: string
  st_subline: string
}
export interface InternalLink {
  type: 'Link'
  template: 'internal_link'
  data: {
    lt_link: {
      type: 'Reference'
      referenceId: string
      referenceType: 'PageRef'
    }
    lt_text: string
  }
  meta: Object
}
export interface OptionType {
  type: string
  key: string
  value: string
  fsType: string
  label: string
  identifier: string
}

export interface Feature {
  st_image: Image
  st_image_alt_text: string
  st_title: string
  st_link: InternalLink
  st_text: RichTextElement[]
  st_product: DataEntry[]
  st_type: OptionType
}
export interface FeatureWrapper {
  id: string
  type: string
  previewId: string
  data: Feature
}
export interface Features {
  st_features: FeatureWrapper[]
  st_headline: string
  st_text: RichTextElement[]
}
export interface StepsItem {
  st_text: RichTextElement[]
  st_title: string
}
export interface StepsSectionData {
  st_headline: string
  st_steps: [
    {
      id: string
      data: StepsItem
    }
  ]
  st_subline: string
  st_text: RichTextElement[]
}
