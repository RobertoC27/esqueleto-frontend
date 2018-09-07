var web3latest;
if (typeof window.web3 !== 'undefined') {
    web3latest = new Web3(window.web3.currentProvider);
    console.log('Metamask');
} else {
    // If no injected web3 instance is detected, fallback to AWS instance (nodo-1).    
    var provider = new Web3.providers.HttpProvider('http://54.71.80.178:8989');
    console.log('AWS');
    web3latest = new Web3(provider)
}
console.log(web3latest.version);

ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalTransfers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_description",
				"type": "bytes32"
			},
			{
				"name": "_date",
				"type": "uint256"
			}
		],
		"name": "newTransfer",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "bytes32"
			}
		],
		"name": "setId",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "expired",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "setExpiryDate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transfers",
		"outputs": [
			{
				"name": "date",
				"type": "uint256"
			},
			{
				"name": "agent",
				"type": "address"
			},
			{
				"name": "description",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "state",
				"type": "bool"
			}
		],
		"name": "setFinished",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "state",
				"type": "bool"
			}
		],
		"name": "setExpired",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "id",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "finished",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "timeToLive",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_id",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

ShippingContract = new web3latest.eth.Contract(ABI, '0x6ef35f0e56c73d96f42683ad9821c2c701954ff5');

//este metodo te devuelve el status del "cargamento"
function getStatuses() {
    ShippingContract.methods.finished().call().then((isExpired) => {
        return isExpired;
    }).then((isExpired) => {
        ShippingContract.methods.finished().call().then((isFinished) => {
            //estos son los otros 2 valores que tendrias que mostrar
            console.log(isExpired, isFinished);
            
        })
    });
}

function fromHex(arg) {
	return web3latest.utils.toUtf8(arg);
}

function getSteps() {
    
    totalTransfers = ShippingContract.methods.getTotalTransfers().call();
    totalTransfers.then((result) => {
        for (let index = 0; index < result; index++) {
            ShippingContract.methods.transfers(index).call().then((info) => {
                //estos son los elementos que se tienen que mostrar 
                console.log(fromHex(info['description']));
                console.log(info['date']);
				console.log(info['agent']);
				console.log(info);
				
            })
            
        }
        
    })
    getStatuses();
}

func = async () => {
	console.log(await ShippingContract.methods.id().call());
}
func();
getSteps();