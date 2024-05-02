import {
  DashBoardRepository,
  dashBoardRepository,
} from "../data/dashnoard.repository";

class DashboardService {
  constructor(private dashBoardRepository: DashBoardRepository) {}

  getDashboardOverviewById(id: string) {
    return dashBoardRepository.getDashboardOverviewById(id);
  }
  getWeeklyDataById(id: string) {
    return dashBoardRepository.getWeeklyDataById(id);
  }
  async getHighSaleProductsById(id: string) {
    return dashBoardRepository.getHighSaleProductsById(id);
  }
}
const dashboardService = new DashboardService(dashBoardRepository);
export { dashboardService };
