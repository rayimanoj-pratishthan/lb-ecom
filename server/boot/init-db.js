module.exports = function(app) {
    const ds = app.dataSources.db; // must match name in datasources.json
  
    ds.automigrate(['ACL', 'AccessToken', 'Role', 'RoleMapping', 'User'], function(err) {
      if (err) throw err;
      console.log('✅ Built-in LoopBack tables created in PostgreSQL.');
    });
    if (!ds) {
        throw new Error('Data source "postgres" not found.');
    }

    ds.automigrate('Product', function (err) {
        if (err) throw err;
        console.log('✅ Product table created.');
    });
  };
  