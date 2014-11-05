'use strict';

describe('App Toolbar', function () {

  var scope, marketplaceApi, dashboardApi;

  // load the filter's module
  beforeEach(module('ozpWebtop.appToolbar'));

  beforeEach(inject(function($rootScope, $controller, _marketplaceApi_,
    _dashboardApi_) {
    scope = $rootScope.$new();
    marketplaceApi = _marketplaceApi_;
    dashboardApi = _dashboardApi_;
    marketplaceApi.createExampleMarketplace();

    // create example dashboards
    dashboardApi.createExampleDashboards().then(function() {

    }).catch(function(error) {
      expect(error).toEqual('should not have happened');
    });

    scope.layout = 'grid';
    $controller('ApplicationToolbarCtrl', {$scope: scope});

    $rootScope.$apply();
  }));

  var allowedLayouts = ['grid','desktop'];

  it('should expose the layout', function() {
    expect(scope.layout).toBeDefined();
  });

  it('webtop should have layout grid or desktop', function() {
    expect(allowedLayouts).toContain(scope.layout);
  });

  it('should get a list of dashboards from the dashboardApi', function() {
      if(!scope.$$phase) { scope.$apply(); }
      expect(scope.dashboards.length).toBeGreaterThan(0);
  });

  it('should expose a setCurrentDashboard method', function() {
    var dashboard = 'test dashboard foo';
    scope.setCurrentDashboard(dashboard);
    expect(scope.currentDashboard).toBe(dashboard);
  });

  it('should expose a useGridLayout method', function() {
    scope.useGridLayout();
    scope.$apply();
    expect(scope.layout).toBe('grid');
  });

  it('should expose a useDesktopLayout method', function() {
    scope.useDesktopLayout();
    expect(scope.layout).toBe('desktop');
  });

  it('should expose $scope.apps', function() {
    if(!scope.$$phase) { scope.$apply(); }
    expect(scope.apps).toBeDefined();
  });

  //WebTop is built off config file, since there are no api's currently that we would be able to get myApps, this makes sure the hard coded objects have values
  // ** Had to comment these out because the appToolbar apps come in dynamically after the activeFrames are added to scope
  // it('should have more than 0 apps in myApps', function(){
  //   expect(scope.myApps.length).toBeGreaterThan(0);
  // });

  // it('should have more than 0 apps in myPinnedApps', function(){
  //   expect(scope.myPinnedApps.length).toBeGreaterThan(0);
  // });
  // TODO: more tests


});