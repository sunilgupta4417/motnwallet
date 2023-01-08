declare class Web3Service {
    /**
     * Query account balance
     * @param {string} account
     * @returns {string}
     * */
    getBalance(account: string): Promise<string>;
    /**
   * Query account balance
   * @param {string} account
   * @returns {string}
   * */
    getAllocatedAmount(account: string): Promise<string>;
    /**
     * Query allocate token
     * @param {string} address
     * @param {number} amount
     * @returns {string}
     * */
    allocate(toAddress: string, amount: number): Promise<string>;
    /**
      * Query Approve Motion token
     * @param {number} amount
     * */
    approve(amount: number): Promise<string>;
    /**
     * Helper method
     * Signs given transaction and submits it to the network
     * @param tx
     * @private
     */
    private submitTransaction;
}
export default Web3Service;
