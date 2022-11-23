# clubIRL

## Setting up

### Auth

For auth we need a wallet private key, so add the private key as an env:

```
THIRDWEB_PRIVATE_KEY=...
```

### Edition drop

Go to [thirdweb](https://thirdweb.com/thirdweb.eth/DropERC1155) and deploy a new edition drop contract. Add in your details and click deploy.

Now, add an NFT and add claim conditions.

Finally, add the contract address as an env variable:

```bash
NEXT_PUBLIC_THIRDWEB_CONTRACT_ADDRESS=...
```

### Airtable

Go to [Airtable](https://airtable.com/) and create a new base.

After you create a new base, give a name to your base and add two columns: `Address` and `Minted` like this:

**Getting airtable api keys and id**

We now need to get some api key's and id's to interact with the base. So, go to [your Airtable account](https://airtable.com/account) and generate an api key.

Store this api key somewhere safe as we are going to need it.

Now to get the base id go to the [Airtable API](https://airtable.com/api) and click on the base that you just created. When you open the page, at the top itself you would see "Your base id is app......".

Inside `.env.local` add three new variables:

```bash:.env.local
AIRTABLE_API_KEY=...
AIRTABLE_BASE_ID=...
AIRTABLE_TABLE_NAME=...
```

### Gasless

Setup biconomy relayer by following this [guide](https://blog.thirdweb.com/guides/biconomy-gasless-guide/). Add the biconomy api key and id as env variables:

```bash:.env.local
NEXT_PUBLIC_BICONOMY_ID=...
NEXT_PUBLIC_BICONOMY_KEY=...
```
