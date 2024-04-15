// creating wallet for solana
// 1 SOL = 1000000 LAMPORTS that is for transaction flexibility

const {
    Connection, 
    PublicKey,
    ClusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    clusterApiUrl
} = require('@solana/web3.js');

const wallet = new Keypair()

// 2 types of keys,
// 1. Public key => people send currancy to you (Known to everyone)
// 2. Private key => You can send currancy to people (It is private)

const publickey = new PublicKey(wallet._keypair.publicKey)
const secretkey = wallet._keypair.secretKey

// console.log(publickey)
// console.log(secretkey)

const getWalletBalance = async() => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await
            connection.getBalance(publickey)
        console.log(`Wallet Balance is ${walletBalance}`)
    }catch(e){
        console.log(`error ${e}`)
    }
}

const airDropSol = async() =>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        console.log(`1 SOL = ${LAMPORTS_PER_SOL}`)
        const fromAirDropSignature = await connection.requestAirdrop(publickey, 2*LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    }catch(e){
        console.log(`error ${e}`)
    }
}

const main = async() =>{
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()