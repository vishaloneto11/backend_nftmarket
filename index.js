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


const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generateECDSA();

async function main() {
	
	let nftCreate = await new TokenCreateTransaction()
		.setTokenName("The Queen of Seven kingdom")
		.setTokenSymbol("SEVKING")
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

	
	
	
	CID = "ipfs://Qmcn6kFRgxnmM5nSpApcrAiKcdYCojFS2gRokanpgL9Afp";
	
	
    
	
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