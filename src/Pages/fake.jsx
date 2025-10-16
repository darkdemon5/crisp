  const handleResumeUpload = async (file) => {
    const extractInfo = async (text) => {
      // Email regex pattern
      const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
      // Phone regex pattern (handles various formats)
      const phonePattern = /(?:\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g;
      // Name pattern (looks for 2-3 consecutive capitalized words)
      const namePattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b/;

      const emails = text.match(emailPattern) || [];
      const phones = text.match(phonePattern) || [];
      const names = text.match(namePattern) || [];

      return {
        email: emails[0] || '',
        phone: phones[0] || '',
        name: names[0] || ''
      };
    };

    const validateInfo = (info) => {
      const missing = [];
      if (!info.name) missing.push('name');
      if (!info.email) missing.push('email');
      if (!info.phone) missing.push('phone');
      return missing;
    };

    try {
      let text = '';
      let attempts = 0;
      const maxAttempts = 3;

      // Read file content based on file type
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();
        text = content.items.map(item => item.str).join(' ');
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        message.error('Please upload a PDF or DOCX file');
        return false;
      }

      while (attempts < maxAttempts) {
        const info = await extractInfo(text);
        const missingFields = validateInfo(info);

        if (missingFields.length === 0) {
          // All information found
          dispatch(updateCandidateField({ field: 'name', value: info.name }));
          dispatch(updateCandidateField({ field: 'email', value: info.email }));
          dispatch(updateCandidateField({ field: 'phone', value: info.phone }));
          dispatch(updateResume(text));
          dispatch(addBotMessage('Resume parsed successfully! Starting your interview...'));
          return true;
        }
        attempts++;
      }

      // If we get here, we couldn't extract all information after max attempts
      const missingFields = validateInfo(await extractInfo(text));
      dispatch(updateResume(text));
      dispatch(addBotMessage(`Could not extract all information. Please provide your ${missingFields[0]}.`));
      message.warning(`Please manually enter the following details: ${missingFields.join(', ')}`);
      return false;

    } catch (error) {
      console.error('Error parsing resume:', error);
      message.error('Error parsing resume. Please try again or enter details manually.');
      return false;
    }
  };

    const handleSubmit = () => {
    console.log("Submitting:", input);
    if (!input.trim()) return message.warning("Please enter a response");

    dispatch(addUserMessage(input));
    console.log("Missing fields:", missing);
    if (missing && missing.length > 0) {
      const field = missing[0];
      dispatch(updateCandidateField({ field, value: input }));
      const nextMissing = missing.slice(1);
      if (nextMissing.length > 0) {
        dispatch(
          addBotMessage(`Thanks! Now please provide your ${nextMissing[0]}.`)
        );
        message.error(
          `Please provide the following missing fields: ${nextMissing.join(
            ", "
          )}`
        );
      } else {
        dispatch(
          addBotMessage(
            "Perfect! All details captured. Starting your interview now..."
          )
        );
      }
    } else {
      dispatch(saveAnswer(input));
      dispatch(addBotMessage("Got it! Next question coming up..."));
      dispatch(nextQuestion());
    }
    console.log("Missing fields:", missing);
  };