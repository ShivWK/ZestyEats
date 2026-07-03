import { setPathHistory, selectPathHistory } from '../features/home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const useTrackNavigation = () => {
  const pathname = useLocation().pathname;
  const pathHistory = useSelector(selectPathHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      pathname !== pathHistory[pathHistory.length - 1] &&
      pathname !== undefined
    ) {
      dispatch(setPathHistory(pathname));
    }
  }, [pathname, pathHistory, dispatch]);
};

export default useTrackNavigation;

// Resolving deltas: 100% (221/221), completed with 185 local objects.
// remote: error: GH013: Repository rule violations found for refs/heads/master.
// remote: 
// remote: - GITHUB PUSH PROTECTION
// remote:   —————————————————————————————————————————
// remote:     Resolve the following violations before pushing again
// remote: 
// remote:     - Push cannot contain secrets
// remote: 
// remote:     
// remote:      (?) Learn how to resolve a blocked push
// remote:      https://docs.github.com/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line#resolving-a-blocked-push
// remote:     
// remote:      (?) This repository does not have Secret Scanning enabled, but is eligible. Enable Secret Scanning to view and manage detected secrets.
// remote:      Visit the repository settings page, https://github.com/ShivWK/ZestyEats/settings/security_analysis
// remote:     
// remote:     
// remote:       —— Google OAuth Client ID ————————————————————————————
// remote:        locations:
// remote:          - commit: 2c65d0deb2c76e08eb36ad8475a232425fc20a99
// remote:            path: src/components/Login/ModalSubContainer.jsx:54
// remote:          - commit: 2c65d0deb2c76e08eb36ad8475a232425fc20a99
// remote:            path: src/components/Login/ModalSubContainer.jsx:154
// remote:     
// remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
// remote:        https://github.com/ShivWK/ZestyEats/security/secret-scanning/unblock-secret/3FuMFwuqToGLDwEcaueoPtz75vl
// remote:     
// remote:     
// remote:       —— Google OAuth Client Secret ————————————————————————
// remote:        locations:
// remote:          - commit: 2c65d0deb2c76e08eb36ad8475a232425fc20a99
// remote:            path: src/components/Login/ModalSubContainer.jsx:55
// remote:     
// remote:        (?) To push, remove secret from commit(s) or follow this URL to allow the secret.
// remote:        https://github.com/ShivWK/ZestyEats/security/secret-scanning/unblock-secret/3FuMFzFCGAtzonIbXJQiX4uXl6e
// remote:     
// remote: 
// remote: 
// To https://github.com/ShivWK/ZestyEats.git
//  ! [remote rejected] master -> master (push declined due to repository rule violations)
// error: failed to push some refs to 'https://github.com/ShivWK/ZestyEats.git'