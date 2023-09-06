declare class NftWeb3Service {
    /**
     * Query account balance
     * @param {string} account
     * @returns {string}
     * */
    getBalance(account: string): Promise<any>;
    /**
     * Query allocate token
     * @param {any} contract
     * @param {string} account
     * @returns {string}
     * */
    IsNft(contract: any, account: string): Promise<number>;
}
export default NftWeb3Service;
