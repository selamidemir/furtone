exports.adminCheck = (req, res, next) => {
    if(res.locals.admin) next();
    else {
        res.status(400).redirect("/");
    }
}

exports.userCheck = (req, res, next) => {
    if(res.locals.user) next();
    else res.status(400).redirect("/furnitures");
}