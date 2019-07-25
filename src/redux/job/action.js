import axios from "axios";
import { SAVE_JOBS_SUCCESS, SAVE_JOBS_FALURE } from "./type";

/**
 * @desc fetch Jobs From API
 * @return function - call API with these informations, then dispatch scuccessful action or failed action
 */
export function fetchJobs(query = "", page = 1) {
  return async function(dispatch) {
    try {
      const jobs = await axios.get(`https://dev.search.bossjob.com/api/v1/search/job_filter?size=12&query=${query}&page=${page}
      `);
      dispatch({
        type: SAVE_JOBS_SUCCESS,
        data: jobs.data.data.jobs,
        current_page: page,
        total: jobs.data.data.total_num,
        query: query
      });
    } catch (error) {
      dispatch({
        type: SAVE_JOBS_FALURE,
        error: error.response.data
      });
    }
  };
}
