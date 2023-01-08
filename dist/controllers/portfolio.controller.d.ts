import PortfolioService from '../services/portfolio.service';
import { CreatePortfolioDto } from '../dtos/portfolio.dto';
export declare class PortfolioController {
    portfolioService: PortfolioService;
    getPortfolioOverview(data: CreatePortfolioDto): Promise<{
        data: any;
        message: string;
    }>;
    getAllocatedTokenOverview(data: CreatePortfolioDto): Promise<{
        data: any;
        message: string;
    }>;
}
