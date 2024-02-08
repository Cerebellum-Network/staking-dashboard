# Cere Staking Dashboard [Beta]

The Polkadot Staking Dashboard is a community-driven project, and we welcome contributions to bolster the dashboard's functionality and features.

- **Web Extensions**: Submit PR to the [Polkadot Cloud repository](https://github.com/polkadot-cloud/library/tree/main/packages/assets#adding-web-extension-wallets) to add a web extension. The extension will then be available in the `@polkadot-cloud/assets` NPM package. Full instructions can be found [here](https://github.com/polkadot-cloud/library/tree/main/packages/assets#adding-web-extension-wallets).

- **Validator Operators**: Submit PR to the [Polkadot Cloud repository](https://github.com/polkadot-cloud/library/tree/main/packages/assets#adding-validator-operators) to add a validator operator. The operator will then be available in the `@polkadot-cloud/assets` NPM package. Full instructions can be found [here](https://github.com/polkadot-cloud/library/tree/main/packages/assets#adding-validator-operators).

- **Thumbnail SVG:** Add your entity's thumbnail as an SVG file to [this folder](https://github.com/Cerebellum-Network/staking-dashboard/tree/dev-cere/src/config/validators/thumbnails).
- **Entity details:** Add your entity details to the `VALIDATORS_COMMUNITY`JSON object in [this file](https://github.com/Cerebellum-Network/staking-dashboard/blob/dev-cere/src/config/validators/index.ts).

Polkadot Staking Dashboard supports URL variables that can be used to direct users to specific configurations of the app, such as landing on a specific language or on a specific network. Variables are added at the end of the hash portion of URL.

| Element        | Key          | Required | Notes                                                                                                                  | Example                                                 |
|----------------|--------------|----------|------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| Entity Name    | `name`       | Yes      | The chosen name of your entity.                                                                                        | `Validator Central`                                     |
| Thumbnail SVG  | `Thumbnail`  | Yes      | Must be a square SVG file with a non-transparent background, to ensure compatibility with both light and dark theming. | *See Below*                                             | 
| Bio            | `bio`        | No       | A short description of your entity. Maximum 300 characters.                                                            | `Summing up my validator identity in a sentence or so.` |
| Email Address  | `email`      | No       | A public email address representing your entity.                                                                       | `team@cere.network`                                     |
| Twitter Handle | `twitter`    | No       | The Twitter handle representing your entity.                                                                           | `@CereNetwork'`                                         |
| Website URL    | `website`    | No       | A live and vlid secure URL to your website.                                                                            | `https://cere.network`                                  |
| Validator List | `validators` | Yes      | A list of validators grouped by network. At least 1 validator in 1 network must be defined.                            | *See Below*                                             |

- **n**: Controls the default network to connect to upon visiting the dashboard. Supported values are `polkadot`, `kusama` and `westend`.
- **l**: Controls the default to use upon visiting the dashboard. Supported values are `en` and `cn`.
- **a**: Controls the account to connect to upon visiting the dashboard. Ignored if the account is not present in the initial imported accounts.

URL variables take precedence over saved values in local storage, and will overwrite current configurations. URL variables will update (if present) as a user switches configurations in-app, such as changing the network or language.

### Example URL:

The following URL will load Kusama and use the Chinese localisation resource:

```
import { ReactComponent as Cere } from './thumbnails/cere.svg';
```

Then add your entity details to the `VALIDATOR_COMMUNITY` object. Only provide the validator(s) for the particular network(s) you are operating in.

The following example defines 8 validators on the Cere Network

```
export const VALIDATOR_COMMUNITY = [
  ...
  {
    name: 'CERE',
    Thumbnail: Cere,
    bio: `Official Validators from Cere Network, the world's first Decentralized Data Cloud platform.`,
    email: 'team@cere.network',
    website: 'https://cere.network',
    twitter: '@CereNetwork',
    validators: {
      cere: [
        '6S4mrsCrqWoBAYrp2PKQNh7CYcCtyEtYpx5J626Kj5vszSyy',
        '6QhzyvZQm3dLjDmeaoUnLPXzfuTi6X1HEo6AX6gfVbC3shzD',
        '6RgfwDiQTLjgbkQ5CorrKtRtCaDABQKYsibk9MeyvzmKFrk2',
        '6TBhZAgtFc3Wr8BeNu5tdMJG1NDpxKbG2Hwf2UbVtMGyFxzN',
        '6Pyh9zZgp4XCP338VDG7oshK7PvsAdyuBN6S2NNm7CBoCXx8',
        '6S9tXQmPYoeBXYey8vKYi9BMbNMD8Zgqb62k7SYMNQLUbydZ',
        '6PwAv2L43zGPEwHTb1L7LyCWv7yq2Hc4dSVYHvvi1kscCR91',
        '6Qshjra42mLDtc9ouHzUz1bMmYXg2qasmW2xSLgendRdsYED',
      ],
    },
  },
  ...
];

```

Then run your container with:

| Requirement | Notes                                                                                                                                                                                                                            |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Accuracy    | Entity contact details must be working and valid.                                                                                                                                                                                |
| Liveness    | All submitted validator addresses must be discoverable as a validator on Cere Network.                                                                                                                                           |
| Ordering    | Please place your entity in alphabetical order within `VALIDATOR_COMMUNITY`. Validator entities (and their validators) are shuffled before being displayed in the dashboard, removing any bias associated with ordering methods. |

Please submit an issue for any queries around adding your validator entity.

# Contribution Guide

## Introduction
This section aims to familiarise developers to the Cere Staking Dashboard [[GitHub](https://github.com/Cerebellum-Network/staking-dashboard), [Demo](https://paritytech.github.io/polkadot-staking-dashboard/#/overview)] for the purpose of contributing to the project.

Reach out to community@cere.io for clarification of any content within this document.

## Major Packages Used

- React 18
- Polkadot JS API [[docs](https://polkadot.js.org/docs/api)]
- React Chart JS 2 for graphing. [[docs](https://www.chartjs.org/docs/latest/), [React docs](https://react-chartjs-2.js.org/)]
- Framer Motion. [[docs](https://www.framer.com/docs/animation/)]
- [Font Awesome](https://fontawesome.com/v5/search) for the majority of icons. [Ionicons](https://ionic.io/ionicons) for side menu footer icons
- Downshift for dropdowns [[docs](https://www.npmjs.com/package/downshift)]
- Styled Components [[docs](https://styled-components.com/docs)] alongside Styled Theming [[docs](https://www.npmjs.com/package/styled-theming)] for theme configuration.

## Environment Variables
Optionally apply the following envrionment variables in an environment file such as `.env` or with `yarn build` to customise the build of staking dashboard:
```
# disable all mentioning of fiat values and token prices
REACT_APP_DISABLE_FIAT=1

# display an organisation label in the network bar
REACT_APP_ORGANISATION="© Parity Technologies"

# provide a privacy policy url in the network bar
REACT_APP_PRIVACY_URL=https://www.parity.io/privacy/

# include the testnet configuration
REACT_APP_INCLUDE_TESTNET=true
```

<!-- markdown-link-check-disable -->
And access the **Staking Dashboard** at http://localhost:8080/.
<!-- markdown-link-check-enable-->

## Presentations

- 29/06/2023: [[Video] Polkadot Decoded 2023: The Next Step of the Polkadot UX Journey](https://www.youtube.com/watch?v=s78SZZ_ZA64)
- 30/06/2022: [[Video] Polkadot Decoded 2022: Polkadot Staking Dashboard Demo](https://youtu.be/H1WGu6mf1Ls)
