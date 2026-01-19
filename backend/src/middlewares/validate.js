export function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = {};
      error.details.forEach(d => {
        if (d.path && d.path[0]) {
          details[d.path[0]] = d.message;
        }
      });
      return res.status(400).json({ success: false, message: "Datos inválidos", details });
    }
    next();
  };
}
