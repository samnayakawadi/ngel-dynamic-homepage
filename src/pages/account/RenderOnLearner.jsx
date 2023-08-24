import UserService from "../../services/UserService"

const RenderOnLearner = ({ children }) => (
    UserService.hasRole(['learner'])) ? children : null;
export default RenderOnLearner
