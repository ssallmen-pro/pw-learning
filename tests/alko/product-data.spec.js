import { test, expect } from '../../fixtures/alko-test'

const products = [
  {
    productId: 132,
    productName: {
      fi: 'Koskenkorva Viina',
      sv: 'Koskenkorva Brännvin',
      en: 'Koskenkorva Viina'
    },
    productPrice: 16.59,
    productVolume: '0.5 l',
    productFacts: {
      fi: {
        productId: '000132',
        alcohol: '38.0%',
        sugar: '3.0 g/l',
        deposit: '0.1 €',
        packaging: 'pullo',
        closure: 'metallinen kierrekapseli',
        producer: 'Altia',
        selection: 'vakiovalikoima'
      },
      sv: {
        productId: '000132',
        alcohol: '38.0%',
        sugar: '3.0 g/l',
        deposit: '0.1 €',
        packaging: 'flaska',
        closure: 'skruvkapsyl av metal',
        producer: 'Altia',
        selection: 'ordinarie sortiment'
      },
      en: {
        productId: '000132',
        alcohol: '38.0%',
        sugar: '3.0 g/l',
        deposit: '0.1 €',
        packaging: 'bottle',
        closure: 'metal screw cap',
        producer: 'Altia',
        selection: 'general selection'
      }
    }
  },
  {
    productId: 101486,
    productName: {
      fi: 'Jaloviina * muovipullo',
      sv: 'Jaloviina * plastflaska',
      en: 'Jaloviina * plastic bottle'
    },
    productPrice: 19.69,
    productVolume: '0.5 l',
    productFacts: {
      fi: {
        productId: '101486',
        alcohol: '38.0%',
        sugar: '7.0 g/l',
        deposit: '0.2 €',
        packaging: 'muovipullo',
        closure: 'muovisuljin',
        producer: 'Altia',
        selection: 'vakiovalikoima'
      },
      sv: {
        productId: '101486',
        alcohol: '38.0%',
        sugar: '7.0 g/l',
        deposit: '0.2 €',
        packaging: 'plastflaska',
        closure: 'förslutare av plast',
        producer: 'Altia',
        selection: 'ordinarie sortiment'
      },
      en: {
        productId: '101486',
        alcohol: '38.0%',
        sugar: '7.0 g/l',
        deposit: '0.2 €',
        packaging: 'plastic bottle',
        closure: 'plastic closure',
        producer: 'Altia',
        selection: 'general selection'
      }
    }
  }
]

for (const product of products) {
  test(`Validate product details for product with id ${product.productId}`, async ({ productPage, language }) => {
    await productPage.open(product.productId)
    await productPage.acceptCookies()
    await test.step('Check basic product data', async () => {
      await expect(await productPage.isOpen()).toEqual(true)
      await expect(productPage.productName).toHaveText(product.productName[language])
      await expect(await productPage.productPrice()).toEqual(product.productPrice)
      await expect(productPage.productVolume).toHaveText(product.productVolume)
    })
    for (const [field, value] of Object.entries(product.productFacts[language])) {
      await test.step(`Check that ${productPage.translation(field)} contains ${value}`, async () => {
        await expect(await productPage.productFact(productPage.translation(field))).toHaveText(value)
      })
    }
  })
}
