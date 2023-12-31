import axios from "axios";

export default function useRemoveJob(jobs) {

    const removeJob = async (job) => {
        try {
            const response = await axios.delete(
                "/job", {
                params: {
                    id: job.id
                }
            }
            );
        } catch (error) {
            console.log(error)
        }
    }

    return {
        removeJob
    }
}