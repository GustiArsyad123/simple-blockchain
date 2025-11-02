const SHA256 = require('crypto-js/sha256');

// Definisikan kelas Block
class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
    }
}

// Definisikan kelas Blockchain
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // Membuat blok pertama (Genesis Block)
    createGenesisBlock() {
        return new Block(0, "0", 1633036800, "Genesis Block", this.calculateHash(0, "0", 1633036800, "Genesis Block"));
    }

    // Mendapatkan blok terakhir
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Menambahkan blok baru ke blockchain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = this.calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data);
        this.chain.push(newBlock);
    }

    // Menghitung hash untuk blok
    calculateHash(index, previousHash, timestamp, data) {
        return SHA256(index + previousHash + timestamp + data).toString();
    }

    // Memverifikasi integritas blockchain
    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Memeriksa apakah hash blok valid
            if (currentBlock.hash !== this.calculateHash(currentBlock.index, currentBlock.previousHash, currentBlock.timestamp, currentBlock.data)) {
                return false;
            }

            // Memeriksa apakah hash blok sebelumnya sesuai
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// Membuat instance blockchain
let myBlockchain = new Blockchain();

// Menambahkan beberapa blok ke blockchain
myBlockchain.addBlock(new Block(1, myBlockchain.getLatestBlock().hash, 1633037000, { amount: 4 }, ""));
myBlockchain.addBlock(new Block(2, myBlockchain.getLatestBlock().hash, 1633038000, { amount: 10 }, ""));

// Verifikasi dan tampilkan status blockchain
console.log("Is blockchain valid? " + myBlockchain.isValid());
console.log(JSON.stringify(myBlockchain, null, 4));
