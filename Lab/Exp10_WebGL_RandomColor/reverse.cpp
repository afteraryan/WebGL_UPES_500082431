#include <iostream>
using namespace std;


void reverse(int arr[], int n, int size)
{
    for(int k =0; k < n; k++)
    {
        int temp1 = arr[0];
        int temp2;
        
        for(int i=0; i<size; i++)
        {
            temp2 = arr[i];
            arr[i] = temp1;
            temp1 = temp2;
        }
        arr[0] = temp2;

    }
}

void displayarray(int arr[], int size)
{
    for(int i=0; i<size; i++)
    {
        cout<<arr[i]<<" ";
    }
}

int main()
{
    int arr[5] = {1,2,3,4,5};
    int size = 5; int n = 7;
    reverse(arr, n, size);
    displayarray(arr, size);

    return 0;
}