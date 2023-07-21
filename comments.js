// Create web server
// By: fuchun

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var checkLogin = require('../middlewares/check.js').checkLogin;

// POST /comments/create
router.post('/create', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var postId = req.fields.postId;
    var content = req.fields.content;

    // Check parameters
    try {
        if (!content.length) {
            throw new Error('Please fill in the comment.');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var comment = {