const router = require('express').Router();

router.use('/cars', require('./carRoutes'));
router.use('/branches', require('./branchRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/auth', require('./authRoutes'));

router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce((errors, key) => {
                errors[key] = err.errors[key].message;
                return errors;
            }, {}),
        });
    }

    return next(err);
});

module.exports = router;