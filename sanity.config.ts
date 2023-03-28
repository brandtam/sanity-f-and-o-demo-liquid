import {AssetSource, defineConfig, isDev} from 'sanity'

import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {structure} from './desk'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'

// https://github.com/sanity-io/sanity-plugin-shopify-assets
import {shopifyAssets} from 'sanity-plugin-shopify-assets'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: 'Shopify - frank-and-oak-demo',

  projectId: 'sj56fqdq',
  dataset: 'production',

  plugins: [
    deskTool({structure}),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
    shopifyAssets({
      shopifyDomain: 'frank-and-oak-demo.myshopify.com',
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources: AssetSource[]) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },
})
