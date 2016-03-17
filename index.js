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

        this.log( 'token = ' + access_token );

        return this.complete( { foo: 1 } );
    }
};
