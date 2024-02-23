# Cere Staking Dashboard [Beta]

# Validator Entity Setup Guide

Validators can add their identity, contact information and validator list to the dashboard’s Community section. The Community feature is designed to give non-biased exposure to validator entities, and to host a fully-featured validator browser just for that entity's validators.

To add your entity, submit a PR with the following changes:

- **Thumbnail SVG:** Add your entity's thumbnail as an SVG file to [this folder](https://github.com/Cerebellum-Network/staking-dashboard/tree/dev-cere/src/config/validators/thumbnails).
- **Entity details:** Add your entity details to the `VALIDATORS_COMMUNITY`JSON object in [this file](https://github.com/Cerebellum-Network/staking-dashboard/blob/dev-cere/src/config/validators/index.ts).

## Entity Structure
 
The following table outlines the structure of a `VALIDATOR_COMMUNITY` entry:

| Element        | Key          | Required | Notes                                                                                                                  | Example                                                 |
|----------------|--------------|----------|------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| Entity Name    | `name`       | Yes      | The chosen name of your entity.                                                                                        | `Validator Central`                                     |
| Thumbnail SVG  | `Thumbnail`  | Yes      | Must be a square SVG file with a non-transparent background, to ensure compatibility with both light and dark theming. | *See Below*                                             | 
| Bio            | `bio`        | No       | A short description of your entity. Maximum 300 characters.                                                            | `Summing up my validator identity in a sentence or so.` |
| Email Address  | `email`      | No       | A public email address representing your entity.                                                                       | `team@cere.network`                                     |
| Twitter Handle | `twitter`    | No       | The Twitter handle representing your entity.                                                                           | `@CereNetwork'`                                         |
| Website URL    | `website`    | No       | A live and vlid secure URL to your website.                                                                            | `https://cere.network`                                  |
| Validator List | `validators` | Yes      | A list of validators grouped by network. At least 1 validator in 1 network must be defined.                            | *See Below*                                             |

## Example Entity

 At the top of `config/validators/index.ts`, import the SVG you added in the corresponding `./thumbnails` folder as a React component:

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

### General Requirements

| Requirement | Notes                                                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accuracy    | Operator contact details must be working and valid.                                                                                                                                               |
| Liveness    | All submitted validator addresses must be discoverable as a validator on the network in question - whether Polkadot or Kusama.                                                                    |
| Ordering    | Please place your operator in alphabetical order within `ValidatorCommunity`. Operators are shuffled before being displayed in the dashboard, removing any bias associated with ordering methods. |

Please submit an issue for any queries around adding your operator details.

## URL Variables Support

Polkadot staking dashboard supports URL variables that can be used to direct users to specific configurations of the app, such as landing on a specific language or on a specific network.

Variables are added at the end of the hash portion of URL:

```
staking.polkadot.network/#/overview?n=polkadot&l=en
```

The currently supported URL variables are as follows:

- `n`: Controls the network to default to upon visiting the dashboard. Supported values are `polkadot`, `kusama` and `westend`.
- `l`: Controls the language to default to upon visiting the dashboard. Supported values are `en` and `cn`.

URL variables take precedence over saved values in local storage, and will overwrite current configurations. URL variables will update (if present) as a user switches configurations in-app, such as changing the network or language.

### Example URL:

The following URL will load Kusama and use the Chinese localisation resource:

```
staking.polkadot.network/#/overview?n=kusama&l=cn
```

## Presentations

- 30/06/2022: [[Video] Polkadot Decoded 2022: Polkadot Staking Dashboard Demo](https://youtu.be/H1WGu6mf1Ls)
