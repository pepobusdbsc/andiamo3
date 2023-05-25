// Contract address
const contractAddress = '0xb4172656e6c8aeffc45af7bc30eeae017bc90201';

// Contract ABI - Replace with your contract's ABI
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"Lock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"withdrawer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositsByWithdrawer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"depositsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"}],"name":"extendLock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getDepositsByTokenAddress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_withdrawer","type":"address"}],"name":"getDepositsByWithdrawer","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSelfAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getTokenTotalLockedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"address","name":"_withdrawer","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_unlockTimestamp","type":"uint256"}],"name":"lockTokens","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedToken","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"withdrawer","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"unlockTimestamp","type":"uint256"},{"internalType":"bool","name":"withdrawn","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketingAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lockFee","type":"uint256"}],"name":"setLockFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_marketingAddress","type":"address"}],"name":"setMarketingAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"walletTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract instance
let contract;

// Connect with MetaMask
async function connectWithMetamask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      if (networkId === 56) {
        contract = new web3.eth.Contract(contractABI, contractAddress);
        alert('Connected to Binance Smart Chain using MetaMask.');
      } else {
        alert('Please switch to Binance Smart Chain network in MetaMask.');
      }
    } catch (error) {
      console.error('Error connecting with MetaMask:', error);
      alert('Failed to connect with MetaMask. Please check the console for more details.');
    }
  } else {
    alert('Please install MetaMask to use this DApp.');
  }
}

// Toggle approval/locking of tokens
async function toggleApproval() {
  const tokenAddress = document.getElementById('tokenAddress').value;
  const withdrawer = document.getElementById('withdrawer').value;
  const amount = document.getElementById('amount').value;
  const unlockTimestamp = document.getElementById('unlockTimestamp').value;

  try {
    // Call the contract function to approve/lock tokens
    await contract.methods._token(tokenAddress).send({ from: withdrawer });
    await contract.methods._withdrawer(withdrawer).send({ from: withdrawer });
    await contract.methods._amount(amount).send({ from: withdrawer });
    await contract.methods._unlockTimestamp(unlockTimestamp).send({ from: withdrawer });

    const button = document.querySelector('button');
    if (button.innerHTML === 'Approve/Lock Tokens') {
      button.innerHTML = 'Unlock Tokens';
    } else {
      button.innerHTML = 'Approve/Lock Tokens';
    }

    alert('Tokens toggled!');
  } catch (error) {
    console.error('Error toggling tokens:', error);
    alert('Failed to toggle tokens. Please check the console for more details.');
  }
}
