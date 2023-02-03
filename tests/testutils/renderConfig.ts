import HomePageLayout from "../../components/PageLayout/Home.vue";
import StandardPageLayout from "../../components/PageLayout/Standard.vue";

import Body from "../../components/Page/Body.vue";

import Section from "../../components/PageBodyContent/Section.vue";
import Dataset from "../../components/PageBodyContent/Dataset.vue";
import Content2Section from "../../components/PageBodyContent/Content2Section.vue";

import Slider from "../../components/Section/Slider.vue";
import Header from "../../components/Section/Header.vue";

import Unknown from "../../components/Unknown.vue";
import Dev from "../../components/Dev.vue";

export const renderConfig = {
  global: {
    components: {
      PageLayoutHome: HomePageLayout,
      PageLayoutStandard: StandardPageLayout,

      PageBody: Body,

      PageBodyContentSection: Section,
      PageBodyContentDataset: Dataset,
      PageBodyContentContent2Section: Content2Section,

      SectionSlider: Slider,
      SectionHeader: Header,

      Unknown,
      Dev,
    },
  },
};
