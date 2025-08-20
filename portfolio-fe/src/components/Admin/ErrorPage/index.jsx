import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '../Button';

const ErrorPage = ({ 
  error, 
  resetError, 
  title = "Đã xảy ra lỗi", 
  message = "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau." 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center"
        >
          <ExclamationCircleIcon className="w-10 h-10 text-red-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6"
        >
          {message}
        </motion.p>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.5 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left"
          >
            <p className="text-sm text-red-800 font-mono break-all">
              {error.toString()}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          {resetError && (
            <Button
              onClick={resetError}
              variant="primary"
              className="w-full"
            >
              Thử lại
            </Button>
          )}
          
          <Button
            onClick={() => window.history.back()}
            variant="secondary"
            className="w-full"
            icon={ArrowLeftIcon}
          >
            Quay lại
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
