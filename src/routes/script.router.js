import { Router }  from 'express';

const router = Router();


router.post('/addScript', (req, res) => {
  const newScript = req.body.script;
  scripts.push(newScript);
  res.redirect('/');
});

router.post('/runScript', (req, res) => {
  const selectedScriptIndex = req.body.scriptIndex;
  const selectedFileIndex = req.body.fileIndex;

  if(selectedScriptIndex === undefined || selectedFileIndex === undefined){
    return res.status(400).send('Invalid Request');
  }


  try {
    const selectedScript = scripts[parseInt(selectedScriptIndex)];
    const selectedFile = siniestros[parseInt(selectedFileIndex)];


    console.log(selectedScript);
    console.log(selectedFile);
    // Create a function from the script string (Important Security Note: Eval is Dangerous. Sanitize input.)
    const scriptFunction = new Function('siniestro', selectedScript);

    // Execute the validation script

    const validationResults = scriptFunction(selectedFile);
    console.log(validationResults);

    res.json({ success: true, results: validationResults });

  } catch (error) {

    console.error("Error executing script:", error);
    res.status(500).json({ success: false, error: error.message });
  }

});

export default router;