const db = require("../db");

class ResponseController {
    async createResponse(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        const {
            applicant_name,
            email,
            resume_url,
            education,
            experience,
            salary_desired,
            questionnaire_result,
            description,
            skills,
            job_id,
            user_id,
        } = req.body;

        try {
            const newResponse = await db.query(
                `INSERT INTO responses (
            applicant_name, 
            email, 
            resume_url, 
            education, 
            experience, 
            salary_desired, 
            questionnaire_result, 
            description,
            skills,          
            job_id, 
            user_id,
            closed,  
            created_timestamp
                    ) 
                values(
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, false, now()
                    ) RETURNING *`,
                [
                    applicant_name,
                    email,
                    resume_url,
                    education,
                    experience,
                    salary_desired,
                    questionnaire_result,
                    description,
                    skills,
                    job_id,
                    user_id,
                ]
            );

            res.json(newResponse.rows[0]);
        } catch (error) {
            res.json(error + db.query.text);
        }
    }

    async getResponses(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        try {
            const { limit, offset, search } = req.query;
            const searchText = "%" + search + "%";
            var queryText = "";

            queryText = `SELECT
        responses.id,
        responses.applicant_name,
        responses.email,
        responses.resume_url,
        responses.education,
        responses.experience,
        responses.salary_desired,
        responses.questionnaire_result,
        responses.description,
        responses.skills,
        responses.result,
        responses.closed,
        responses.job_id,
        responses.user_id,
        responses.created_timestamp,
        jobs.job_title as job_title,
        jobs.test_doc_id as test_doc_id,
        interviews.id as interview_id,
        CAST(responses.status as VARCHAR),
        response_statuses.name as status_name

        FROM responses

        LEFT OUTER JOIN jobs ON responses.job_id=jobs.id
        LEFT OUTER JOIN interviews ON responses.id=interviews.response_id
        LEFT OUTER JOIN response_statuses ON responses.status=response_statuses.id

        WHERE
        LOWER(applicant_name) LIKE LOWER('${searchText}')
        OR LOWER(job_title) LIKE LOWER('${searchText}')

        ORDER BY closed ASC, id DESC LIMIT ${limit} OFFSET ${offset}`;

            const responses = await db.query(queryText);
            res.json(responses.rows);
        } catch (error) {
            res.json(error + db.query.text);
        }
    }

    async getOneResponse(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const id = req.query.id;

        try {
            const response = await db.query(
                `SELECT 
                    responses.id,
                    responses.applicant_name,
                    responses.email,
                    responses.resume_url,
                    responses.education,
                    responses.experience,
                    responses.salary_desired,
                    responses.questionnaire_result,
                    responses.description,
                    responses.skills,
                    responses.result,
                    responses.closed,
                    CAST (responses.job_id as VARCHAR),
                    responses.user_id,
                    CAST(responses.status as VARCHAR),
                    responses.created_timestamp,
                    jobs.job_title as job_title,
                    jobs.test_doc_id as test_doc_id,
                    interviews.id as interview_id,
                    to_char(interviews.date_and_time, 'DD.MM.YYYY HH24:MI') as interview_date_human,
                    interviews.detail as interview_detail
                    
                    FROM responses

                    LEFT OUTER JOIN jobs ON responses.job_id=jobs.id
                    LEFT OUTER JOIN interviews ON responses.id=interviews.response_id
                    
                    WHERE responses.id=$1`,
                [id]
            );
            res.json(response.rows[0]);
        } catch (error) {
            res.json(error + db.query.text);
        }
    }

    async updateResponse(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const {
            id,
            applicant_name,
            email,
            resume_url,
            education,
            experience,
            salary_desired,
            questionnaire_result,
            description,
            skills,
            status,
            result,
            job_id,
            user_id,
            closed,
        } = req.body;

        try {
            const response = await db.query(
                `UPDATE responses set
            applicant_name = $1,
            email = $2,
            resume_url = $3,
            education = $4,
            experience =$5,
            salary_desired = $6,
            questionnaire_result = $7,
            description = $8,
            skills = $9,
            status = $10,
            result = $11,
            job_id = $12,
            user_id = $13,
            closed = $14
        WHERE id = $15 RETURNING *`,
                [
                    applicant_name,
                    email,
                    resume_url,
                    education,
                    experience,
                    salary_desired,
                    questionnaire_result,
                    description,
                    skills,
                    status,
                    result,
                    job_id,
                    user_id,
                    closed,
                    id,
                ]
            );
            res.json(response.rows[0]);
        } catch (error) {
            res.json(error + db.query.text);
        }
    }

    async deleteResponse(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        const id = req.query.id;

        try {
            const response = await db.query(`DELETE FROM responses WHERE id = $1`, [
                id,
            ]);
            res.json(response.rows[0]);
        } catch (error) {
            res.json(error + db.query.text);
        }
    }
}

module.exports = new ResponseController();
