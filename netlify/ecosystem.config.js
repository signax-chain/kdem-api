module.exports = {
  apps: [
    {
      name: 'Kdem API',
      script: 'index.js',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
      merge_logs: true,
      flush_logs: true,
    }
  ]
};
