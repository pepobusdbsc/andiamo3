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

