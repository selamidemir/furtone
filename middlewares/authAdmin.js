exports.adminCheck = (req, res, next) => {
    if(res.locals.admin) next();
    else {
        res.status(400).redirect("/");
    }
}