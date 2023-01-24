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
	CustomFixedFee
} = require("@hashgraph/sdk");


const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_PVKEY);
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

const supplyKey = PrivateKey.generateECDSA();
// 
		//Create a custom token fractional fee
		
		//Version: 2.0.30
// 
async function main() {
	
	// let nftCustomFee = await new CustomFixedFee()
	// 		.setAmount(100) // 1 token is transferred to the fee collecting account each time this token is transferred
	// 		// .setDenominatingTokenId(tokenId) // The token to charge the fee in
	// 		.setFeeCollectorAccountId(operatorId); // 1 token is sent to this account everytime it is transferred
		 
	let nftCreate = await new TokenCreateTransaction()
		.setTokenName("Genesis Spherahead #1001")
		.setTokenSymbol("GEN")
		.setTokenSymbol("GEN")
		.setTokenType(TokenType.NonFungibleUnique)
		.setDecimals(0)
		.setInitialSupply(0)
		.setTreasuryAccountId(operatorId)
		.setSupplyType(TokenSupplyType.Finite)
		.setMaxSupply(250)
		// .setCustomFees([nftCustomFee])
		.setSupplyKey(supplyKey)
		.freezeWith(client);

	
	let nftCreateTxSign = await nftCreate.sign(operatorKey);
    let nftCreateSubmit = await nftCreateTxSign.execute(client);
    let nftCreateRx = await nftCreateSubmit.getReceipt(client);
    let tokenId = nftCreateRx.tokenId;
    console.log(`- Created NFT with Token ID: ${tokenId} \n`);

	
	
	
	CID = "ipfs://QmaBtD4GatsRuVqXeoWnEa8twqKGXRKARKABTS2Vm2AJSm";
	
	
    
	
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