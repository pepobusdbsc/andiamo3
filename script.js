// Contract address
const contractAddress = '0xb4172656e6c8aeffc45af7bc30eeae017bc90201';

// Contract instance
let contract;

// Connect with MetaMask
async function connectWithMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        if (networkId === 56) {
            contract = new web3.eth.Contract(contractABI, contractAddress);
            alert('Connected to Binance Smart Chain using MetaMask.');
        } else {
            alert('Please switch to Binance Smart Chain network in MetaMask.');
        }
    } else {
        alert('Please install MetaMask to use this DApp.');
    }
}

// Approve tokens
async function approveTokens() {
    const tokenAddress = document.getElementById('tokenAddress').value;
    const withdrawer = document.getElementById('withdrawer').value;
    const amount = document.getElementById('amount').value;
    const unlockTimestamp = document.getElementById('unlockTimestamp').value;

    try {
        await contract.methods._token(tokenAddress).send({ from: withdrawer });
        await contract.methods._withdrawer(withdrawer).send({ from: withdrawer });
        await contract.methods._amount(amount).send({ from: withdrawer });
        await contract.methods._unlockTimestamp(unlockTimestamp).send({ from: withdrawer });

        alert('Tokens approved!');
    } catch (error) {
        alert('Failed to approve tokens. Please check your inputs.');
        console.error(error);
    }
}

// Block tokens
async function blockTokens() {
    try {
        // Call the contract function to block tokens (if available)

        alert('Tokens blocked!');
    } catch (error) {
        alert('Failed to block tokens.');
        console.error(error);
    }
}
