import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { HttpException } from '@exceptions/HttpException';
import * as Constants from '../shared/constants';
import Moti from '@/contracts/moti.json';
import Motion from '@/contracts/motion.json';

class Web3Service {
  /**
   * Query account balance
   * @param {string} account
   * @returns {string}
   * */
  public async getBalance(account: string): Promise<string> {
    try {
      const abi = Moti.abi as AbiItem[]
      const motion_abi = Motion.abi as AbiItem[]
      const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER']));
      console.log('proivder', process.env['WEB3_PROVIDER']);
      
      const contract = new web3.eth.Contract(motion_abi, process.env['MOTION_CONTRACT_ADDRESS']);
      return await new Promise(async (resolve, reject) => {
        await contract.methods.balanceOf(account).call((err, result) => {
          if (err !== null) {
            reject(err);
          }
          resolve(web3.utils.fromWei(result, 'ether'));
        });
      });
    } catch (e) {
      throw new HttpException(400, Constants.errorMsg.invalidToken);
    }
  }

    /**
   * Query account balance
   * @param {string} account
   * @returns {string}
   * */
    public async getAllocatedAmount(account: string): Promise<string> {
      try {
        const abi = Moti.abi as AbiItem[]
        const motion_abi = Motion.abi as AbiItem[]
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER']));
        console.log('proivder', process.env['WEB3_PROVIDER']);
        
        const contract = new web3.eth.Contract(abi, process.env['MOTI_CONTRACT_ADDRESS']);
        return await new Promise(async (resolve, reject) => {
          await contract.methods.balance(account).call((err, result) => {
            if (err !== null) {
              reject(err);
            }
            resolve(web3.utils.fromWei(result, 'ether'));
          });
        });
      } catch (e) {
        throw new HttpException(400, Constants.errorMsg.invalidToken);
      }
    }

  /**
   * Query allocate token 
   * @param {string} address
   * @param {number} amount
   * @returns {string} 
   * */
  public async allocate(toAddress: string, amount: number): Promise<string> {
    const abi = Moti.abi as AbiItem[]
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER']));
    const contract = new web3.eth.Contract(abi, process.env['MOTI_CONTRACT_ADDRESS']);
    console.log('>>>>',  web3.utils.toWei(amount.toString()));
    const tx = {
      from: process.env['WEB3_CONTRACT_OWNER_ACCOUNT'],
      to: process.env['MOTI_CONTRACT_ADDRESS'],
      gas: 0x37825,
      // this encodes the ABI of the method and the arguments
      data: contract.methods.allocate(toAddress, web3.utils.toWei(amount.toString())).encodeABI(),
    };
    return await this.submitTransaction(tx);
  }

  /**
    * Query Approve Motion token 
   * @param {number} amount
   * */
  public async approve(amount: number): Promise<string> {
    const abi = Motion.abi as AbiItem[]
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER']));
    const contract = new web3.eth.Contract(abi, process.env['MOTION_CONTRACT_ADDRESS']);
    const tx = {
      from: process.env['WEB3_CONTRACT_OWNER_ACCOUNT'],
      to: process.env['MOTION_CONTRACT_ADDRESS'],
      gas: 0x37825,
      // this encodes the ABI of the method and the arguments
      data: contract.methods.approve(process.env['MOTI_CONTRACT_ADDRESS'], web3.utils.toWei(amount.toString())).encodeABI(),
    };
    return await this.submitTransaction(tx);
  }

  /**
   * Helper method
   * Signs given transaction and submits it to the network
   * @param tx
   * @private
   */
  private async submitTransaction(tx: { data: string; gas: number; from: string; to: string }) {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env['WEB3_PROVIDER']));
    let signerKey: string;
    if (process.env['NODE_ENV'] === 'development') {
      signerKey = process.env['PRIVATEKEY'];
    } else if (process.env['NODE_ENV'] === 'production') {
      signerKey = process.env.PRIVATEKEY;
    } else {
      return await new Promise<string>(resolve => {
        resolve(null);
      });
    }
    console.log('signerKey',signerKey);
    
    const signPromise = await web3.eth.accounts.privateKeyToAccount(signerKey).signTransaction(tx);

    // raw transaction string may be available in .raw or
    // .rawTransaction depending on which signTransaction
    // function was called
    const txHash = await web3.eth
      .sendSignedTransaction(signPromise.rawTransaction)
      .then(result => {
        return result.transactionHash;
      })
      .catch(err => {
        return err;
      });

    return await new Promise<string>(resolve => {
      resolve(txHash);
    });
  }
}

export default Web3Service;
