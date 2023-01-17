require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	TokenMintTransaction,
	TransferTransaction,
	AccountBalanceQuery,
	TokenAssociateTransaction,
} = require("@hashgraph/sdk");

// Configure accounts and client, and generate needed keys
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generateECDSA();

async function main() {
	//Create the NFT
	let nftCreate = await new TokenCreateTransaction()
		.setTokenName("THE Computer BOY")
		.setTokenSymbol("The Thunder of winterland")
		.setTokenType(TokenType.NonFungibleUnique)
		.setDecimals(0)
		.setInitialSupply(0)
		.setTreasuryAccountId(operatorId)
		.setSupplyType(TokenSupplyType.Finite)
		.setMaxSupply(250)
		.setSupplyKey(supplyKey)
		.freezeWith(client);

	
	let nftCreateTxSign = await nftCreate.sign(operatorKey);
    let nftCreateSubmit = await nftCreateTxSign.execute(client);
    let nftCreateRx = await nftCreateSubmit.getReceipt(client);
    let tokenId = nftCreateRx.tokenId;
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);

	
	
	// CID = "ipfs://QmY4gCGS2DoGLvGW8sGeaxxggjYYPC385DpASiQJ8qNwFu";
	CID = "ipfs://QmawqbzosvBJLunXQRH8QcA2xwfM6dPSK3nhqVpdR3Yump";
	
	
    
	// // Mint new NFT
	let mintTx = await new TokenMintTransaction()
		.setTokenId(tokenId)
        .setMaxTransactionFee(3)
		.setMetadata([Buffer.from(CID)])
		.freezeWith(client);
    

	
	let mintTxSign = await mintTx.sign(supplyKey);
	let mintTxSubmit = await mintTxSign.execute(client);
	let mintRx = await mintTxSubmit.getReceipt(client);
	console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
	


}
main();