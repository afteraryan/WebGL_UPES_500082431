#include <iostream>
using namespace std;

void arr_inputArr(int arr[], int n)
{
    for(int i=0; i<n; i++)
        cin>>arr[i];
}

void arr_outputArr(int arr[], int start, int end)
{
    for(int i=start; i<end; i++)
        cout<<arr[i]<<" ";
    cout<<"\n";
}

bool isConsecutive(int arr[], int start, int end)
{
    
    int max = arr[start], min = arr[start];
    for(int i=start; i<end; i++)
    {
        //Max
        if (arr[i]> max)
            max = arr[i];
        else if(arr[i] < min)
            min = arr[i];
    }   

    if(max-min == end-start-1)
        return true;
    else
        return false;

}

int sizeConsecutiveSubArray(int arr[], int n)
{
    int size = 0;

    for(int i=0; i<n; i++)
    {
        for(int j=i; j<n; j++)
        {
            if(isConsecutive(arr, i, j+1))
            {
                if(j-i+1>size)
                {
                    size = j-i+1;
                }
            }
        }
    }
    return size;
}

int main()
{
    int n;
    cin>>n;
    int arr[n];

    arr_inputArr(arr, n);
    cout<<sizeConsecutiveSubArray(arr, n)<<"\n";
    return 1;
}