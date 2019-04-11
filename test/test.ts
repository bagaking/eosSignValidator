import {Application} from "../src";
import * as request from "supertest";
import {assert} from "chai";
import * as Path from "path";
import {Global} from "../src/global";

describe('validate', function () {
    process.env.NODE_ENV = "production";

    Global.setConf(Path.resolve(__dirname, `../src/conf.default.json`), false);
    const server = new Application().server;

    it('correct situation', function (done) {
        this.timeout(10000);
        request(server).post('/validate')
            .set('Accept', 'application/json')
            .send({
                "validatorIdentity": "eos",
                "userIdentity": "kinghand.x",
                "loginToken": "111",
                "secret": "SIG_K1_K7xXFHH1fnmP8CUiwBaHL6kvw2xAYB4gUwmLbQCsidk6VoYbmexPSH4A1igRWuD28GmKCds1sJmrT2343ZPRsSc3nwihuW",
                "algorithm": ""
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert.equal(res.body.statusCode, 200);
                assert.equal(res.body.result, true);
                done();
            })
    });

    it('wrong validatorIdentity', function (done) {
        this.timeout(10000);
        request(server).post('/validate')
            .set('Accept', 'application/json')
            .send({
                "validatorIdentity": "eo2s",
                "userIdentity": "kinghand.x",
                "loginToken": "111",
                "secret": "SIG_K1_K7xXFHH1fnmP8CUiwBaHL6kvw2xAYB4gUwmLbQCsidk6VoYbmexPSH4A1igRWuD28GmKCds1sJmrT2343ZPRsSc3nwihuW",
                "algorithm": ""
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert.equal(res.body.statusCode, 500);
                done();
            })
    });

    it('wrong identity', function (done) {
        this.timeout(10000);
        request(server).post('/validate')
            .set('Accept', 'application/json')
            .send({
                "validatorIdentity": "eo2s",
                "userIdentity": "kingx",
                "loginToken": "111",
                "secret": "SIG_K1_K7xXFHH1fnmP8CUiwBaHL6kvw2xAYB4gUwmLbQCsidk6VoYbmexPSH4A1igRWuD28GmKCds1sJmrT2343ZPRsSc3nwihuW",
                "algorithm": ""
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert.equal(res.body.statusCode, 500);
                done();
            })
    });

    it('wrong secret', function (done) {
        this.timeout(10000);
        request(server).post('/validate')
            .set('Accept', 'application/json')
            .send({
                "validatorIdentity": "eo2s",
                "userIdentity": "kingx",
                "loginToken": "111",
                "secret": "SIG_K1_K7xXFH",
                "algorithm": ""
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                assert.equal(res.body.statusCode, 500);
                done();
            })
    });
});
