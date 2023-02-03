import HomePageLayout from "../../components/PageLayout/Home.vue";
import StandardPageLayout from "../../components/PageLayout/Standard.vue";

import Body from "../../components/Page/Body.vue";

import Section from "../../components/PageBodyContent/Section.vue";
import Dataset from "../../components/PageBodyContent/Dataset.vue";
import Content2Section from "../../components/PageBodyContent/Content2Section.vue";

import Slider from "../../components/Section/Slider.vue";
import Header from "../../components/Section/Header.vue";
import InterestingFacts from "../../components/Section/InterestingFacts.vue";
import Product from "../../components/Section/Product.vue";
import ProductCategory from "../../components/Section/ProductCategory.vue";
import Teaser from "../../components/Section/Teaser.vue";

import Image from "../../components/Elements/Image.vue";
import RichText from "../../components/Elements/RichText.vue";
import RichTextElement from "../../components/Elements/RichTextElement.vue";
import Button from "../../components/Elements/Button.vue";
import Link from "../../components/Elements/Link.vue";
import Text from "../../components/Elements/Text.vue";

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
      SectionInterestingFacts: InterestingFacts,
      SectionTeaser: Teaser,
      SectionProduct: Product,
      SectionProductCategory: ProductCategory,

      ElementsRichText: RichText,
      ElementsImage: Image,
      ElementsRichTextElement: RichTextElement,
      ElementsButton: Button,
      ElementsLink: Link,
      ElementsText: Text,

      Unknown,
      Dev,
    },
  },
};
