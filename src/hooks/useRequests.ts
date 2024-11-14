import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {
  fetchRequests,
  fetchRequestById,
  createRequest,
  submitBid,
} from '../services/requestService';

export const useRequests = () => {
  const dispatch = useAppDispatch();
  const { list: requests, loading, error } = useAppSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const getRequestById = async (id: string) => {
    try {
      const result = await dispatch(fetchRequestById(id)).unwrap();
      return result;
    } catch (err) {
      console.error('Failed to fetch request:', err);
      throw err;
    }
  };

  const createNewRequest = async (requestData: any) => {
    try {
      const result = await dispatch(createRequest(requestData)).unwrap();
      return result;
    } catch (err) {
      console.error('Failed to create request:', err);
      throw err;
    }
  };

  const submitNewBid = async (requestId: string, bidData: any) => {
    try {
      const result = await dispatch(submitBid({ requestId, bidData })).unwrap();
      return result;
    } catch (err) {
      console.error('Failed to submit bid:', err);
      throw err;
    }
  };

  return {
    requests,
    loading,
    error,
    getRequestById,
    createRequest: createNewRequest,
    submitBid: submitNewBid,
  };
};

export default useRequests;