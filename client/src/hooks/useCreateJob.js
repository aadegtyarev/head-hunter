import { ref } from "vue";
import axios from "axios";

export default function useCreateJob(jobs) {
  const createJob = async (job) => {
    try {
      const response = await axios.post("/job", {
        job_title: job.job_title,
        salary_from: job.salary_from,
        salary_to: job.salary_to,
        skills: job.skills,
        education: job.education,
        experience: job.experience,
        test_doc: job.test_doc,
        detail: job.detail,
        user_id: 7,
      });
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createJob,
  };
}
