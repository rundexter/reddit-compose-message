var request = require( 'request' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var provider       = dexter.provider( 'reddit' );
        var access_token   = provider.credentials( 'access_token' );

        var input = function( name ) {
            return step.input( name ).first();
        }

        var api_base = 'https://oauth.reddit.com/';
        var user_agent = 'Dexter:' + dexter.app( 'id' ) + ':v0.0.1' + ' (by /u/friedo4)';

        var options = {
            url:      api_base + '/api/compose',
            headers: {
                'User-Agent': user_agent
            },
            auth: {
                bearer: access_token
            },
            form: {
                api_type:  'json',
                to:        input( 'to' ),
                subject:   input( 'subject' ),
                text:      input( 'text' )
            }
        }

        var self = this;
        request.post( options, function( err, res, body ) {
            var resdata = JSON.parse( body );

            if ( err ) return self.fail( { 'error': err, 'body': body } );
            return self.complete( { result: resdata } );
        })
    }
};
