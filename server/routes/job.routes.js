const Router = require('express')
const router = new Router()
const jobController = require('../controllers/job.controller')

router.post('/job', jobController.createJob)
router.get('/jobs', jobController.getJobs)
router.get('/job', jobController.getOneJob)
router.put('/job', jobController.updateJob)
router.delete('/job', jobController.deleteJob)

module.exports = router