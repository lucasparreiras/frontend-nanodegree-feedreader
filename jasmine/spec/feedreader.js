/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('URLs are defined', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            }
        });


        it('names are defined', function(){
           for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            }
        });
    });


    describe('The menu', function(){

        it('menu element is hidden', function(){
           expect($('body').hasClass('menu-hidden')).toBe(true); 
        });

        it('menu changes visibility when the menu icon is clicked', function(){
           $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

           $('a.menu-icon-link').trigger('click');
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('has at least one entry in feed container', function(){
            expect($('.feed .entry').length).not.toBeLessThan(1);
        });
    });


    describe('New Feed Selection', function(){
        var fisrtContent;
        var nextContent;
        
        beforeEach(function(done){
          $('.feed').empty();
          loadFeed(0, function() {
            fisrtContent = $('.feed').html();
            loadFeed(1, done);
          });
        });
        
        it('ensures the new feed is loaded and the content changes', function(done){
          nextContent = $('.feed').html();
          expect(fisrtContent).not.toBe(nextContent);
          done(); 
        });
        
        afterAll(function(done) {
            loadFeed(0, done);
        });
    });
    
    
}());
